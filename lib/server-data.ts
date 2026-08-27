import { adminDB } from "@/lib/firebase-admin";
import type { Timestamp } from "firebase-admin/firestore";

type FirestoreTimestamp = Timestamp | { seconds: number; nanoseconds?: number };

function toTimestamp(value: FirestoreTimestamp | undefined | null) {
  if (!value) return undefined;
  if (typeof (value as Timestamp).toMillis === "function") {
    const ts = value as Timestamp;
    return { seconds: ts.seconds, nanoseconds: ts.nanoseconds };
  }
  return {
    seconds: (value as { seconds: number }).seconds,
    nanoseconds: (value as { nanoseconds?: number }).nanoseconds ?? 0,
  };
}

export type CalculatorDepartmentData = {
  questions: unknown[];
  customFields: unknown[];
  metaTitle?: string;
  metaDescription?: string;
};

export async function getCalculatorDepartment(
  department: string
): Promise<CalculatorDepartmentData | null> {
  const snap = await adminDB.collection("calculatorDepartments").doc(department).get();
  if (!snap.exists) return null;

  const data = snap.data()!;
  return {
    questions: Array.isArray(data.questions) ? data.questions : [],
    customFields: Array.isArray(data.customFields) ? data.customFields : [],
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
  };
}

export type ServerBlog = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  postedAt?: { seconds: number; nanoseconds: number };
  scheduledAt?: { seconds: number; nanoseconds: number };
  isPublished?: boolean;
};

export async function getPublishedBlogs(): Promise<ServerBlog[]> {
  const snap = await adminDB.collection("blogs").orderBy("scheduledAt", "desc").get();

  const now = new Date();
  return snap.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug ?? "",
        title: data.title ?? "",
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        postedAt: toTimestamp(data.postedAt),
        scheduledAt: toTimestamp(data.scheduledAt),
        isPublished: data.isPublished,
      } satisfies ServerBlog;
    })
    .filter((blog) => {
      if (!blog.scheduledAt) return true;
      const publishDate = new Date(blog.scheduledAt.seconds * 1000);
      return blog.isPublished || publishDate <= now;
    });
}

export type ServerBlogDetail = ServerBlog & {
  updatedAt?: { seconds: number; nanoseconds: number };
};

export async function getBlogBySlug(slug: string): Promise<ServerBlogDetail | null> {
  const snap = await adminDB.collection("blogs").where("slug", "==", slug).limit(1).get();
  if (snap.empty) return null;

  const doc = snap.docs[0];
  const data = doc.data();

  return {
    id: doc.id,
    slug: data.slug ?? slug,
    title: data.title ?? "",
    description: data.description,
    imageUrl: data.imageUrl,
    category: data.category,
    postedAt: toTimestamp(data.postedAt),
    scheduledAt: toTimestamp(data.scheduledAt),
    updatedAt: toTimestamp(data.updatedAt),
    isPublished: data.isPublished,
  };
}

export type ServerCareerCategory = {
  id: string;
  name: string;
  slug: string;
  position: number;
};

export type ServerCareer = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  isImmediate: boolean;
  isFeatured: boolean;
  postedAt?: { seconds: number; nanoseconds?: number };
  updatedAt?: { seconds: number; nanoseconds?: number };
  tag?: string;
  details?: string;
  category: string;
  status?: string;
  scheduledAt?: FirestoreTimestamp;
};

function isCareerVisible(career: ServerCareer & { status?: string; scheduledAt?: FirestoreTimestamp }): boolean {
  if (career.status === "draft") return false;

  if (career.status === "published" || career.status === "live") return true;

  if (career.status === "scheduled" && career.scheduledAt) {
    const scheduledDate =
      typeof (career.scheduledAt as Timestamp).toDate === "function"
        ? (career.scheduledAt as Timestamp).toDate()
        : new Date((career.scheduledAt as { seconds: number }).seconds * 1000);
    return scheduledDate <= new Date();
  }

  if (career.status === undefined || career.status === null || career.status === "") {
    return true;
  }

  return false;
}

export async function getCareerCategories(): Promise<ServerCareerCategory[]> {
  const snap = await adminDB
    .collection("careerCategories")
    .orderBy("position", "asc")
    .get();

  return snap.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name ?? "",
      slug: data.slug ?? "",
      position: data.position ?? 0,
    };
  });
}

export async function getPublishedCareers(): Promise<ServerCareer[]> {
  const snap = await adminDB.collection("careers").orderBy("postedAt", "desc").get();

  const careers = snap.docs
    .map((doc) => {
      const data = doc.data();
      const postedAt = toTimestamp(data.postedAt as FirestoreTimestamp | undefined);
      const updatedAt = toTimestamp(data.updatedAt as FirestoreTimestamp | undefined);

      return {
        id: doc.id,
        slug: data.slug ?? "",
        title: data.title ?? "",
        description: data.description ?? "",
        isImmediate: Boolean(data.isImmediate),
        isFeatured: Boolean(data.isFeatured),
        postedAt: postedAt ? { seconds: postedAt.seconds, nanoseconds: postedAt.nanoseconds } : undefined,
        updatedAt: updatedAt ? { seconds: updatedAt.seconds, nanoseconds: updatedAt.nanoseconds } : undefined,
        tag: data.isImmediate ? "Immediate" : "",
        details: data.description ?? "",
        category: data.category ?? "",
        status: data.status,
        scheduledAt: data.scheduledAt as FirestoreTimestamp | undefined,
      };
    })
    .filter(isCareerVisible)
    .map(({ status: _status, scheduledAt: _scheduledAt, ...career }) => career);

  careers.sort((a, b) => {
    const aSec = a.updatedAt?.seconds ?? a.postedAt?.seconds ?? 0;
    const aNano = (a.updatedAt?.seconds !== undefined ? a.updatedAt?.nanoseconds : a.postedAt?.nanoseconds) ?? 0;
    const aTime = aSec * 1000 + aNano / 1000000;

    const bSec = b.updatedAt?.seconds ?? b.postedAt?.seconds ?? 0;
    const bNano = (b.updatedAt?.seconds !== undefined ? b.updatedAt?.nanoseconds : b.postedAt?.nanoseconds) ?? 0;
    const bTime = bSec * 1000 + bNano / 1000000;

    return bTime - aTime;
  });

  return careers;
}

export async function getPublishedCareerByIdentifier(
  identifier: string
): Promise<ServerCareer | null> {
  const careers = await getPublishedCareers();

  return (
    careers.find(
      (career) => career.id === identifier || career.slug === identifier
    ) ?? null
  );
}
