"use client";

type BlogData = {
  title: string;
  description: any;
  imageUrl?: string;
};

// ✅ Converts EditorJS data → HTML  
function renderEditorJsHTML(data: any) {
  if (!data || !data.blocks) return "";

  return data.blocks
    .map((block: any) => {
      switch (block.type) {
        case "header":
          return `<h${block.data.level} class="my-4 font-bold">${block.data.text}</h${block.data.level}>`;

        case "paragraph":
          return `<p class="my-2">${block.data.text}</p>`;

        case "list":
          const Tag = block.data.style === "ordered" ? "ol" : "ul";
          return `
            <${Tag} class="list-disc list-inside my-4 pl-5">
              ${block.data.items
                .map((item: any) => `<li>${item.content || item}</li>`)
                .join("")}
            </${Tag}>
          `;

        case "checklist":
          return `
            <div class="my-4 space-y-2">
              ${block.data.items
                .map(
                  (item: any) => `
                <label class="flex items-center gap-2">
                  <input type="checkbox" ${item.checked ? "checked" : ""} disabled />
                  <span>${item.text}</span>
                </label>`
                )
                .join("")}
            </div>
          `;

        case "image":
          return `<img src="${block.data.file.url}" class="rounded-xl my-6 w-full" />`;

        case "embed":
          return `
            <div class="my-6">
              <iframe 
                width="100%" 
                height="400px" 
                src="${block.data.embed}" 
                frameborder="0" 
                allowfullscreen>
              </iframe>
            </div>
          `;

        case "raw":
          return block.data.html;

        default:
          return "";
      }
    })
    .join("");
}

export default function BlogInternal({ blog }: { blog: BlogData }) {
  return (
    <div className="container py-10 sm:py-15 lg:py-40">
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full lg:h-[80vh] h-auto rounded-2xl object-cover"
        />
      )}

      <div className="py-10">
        <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>

        <div
          className="text-gray-700 leading-relaxed prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: renderEditorJsHTML(blog.description),
          }}
        />
      </div>
    </div>
  );
}
