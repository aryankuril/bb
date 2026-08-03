"use client";

type BlogData = {
  title: string;
  description?: string;
  imageUrl?: string;
};

// ✅ Render full EditorJS HTML
function renderEditorJsHTML(data: any) {
  if (!data || !data.blocks) return "";

  return data.blocks
    .map((block: any) => {
      switch (block.type) {
        case "header":
          return `<h${block.data.level} class="my-4 font-bold">${block.data.text}</h${block.data.level}>`;

        case "paragraph":
  return `<p class="my-3">${block.data.text
    .replace(
      /<a href="(.*?)">(.*?)<\/a>/g,
      `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$2</a>`
    )}</p>`;

        case "list":
          const Tag = block.data.style === "ordered" ? "ol" : "ul";
          return `
            <${Tag} class="list-inside my-4 pl-6 ${Tag === "ol" ? "list-decimal" : "list-disc"}">
              ${block.data.items
                .map((item: any) => `<li>${item?.content || item}</li>`)
                .join("")}
            </${Tag}>
          `;

        case "checklist":
          return `
            <ul class="my-4 space-y-2">
              ${block.data.items
                .map(
                  (item: any, i: number) => `
                    <li class="flex items-center gap-2">
                      <input id="check-${i}" type="checkbox" ${item.checked ? "checked" : ""}/>
                      <label for="check-${i}" class="cursor-pointer">${item.text}</label>
                    </li>`
                )
                .join("")}
            </ul>
          `;

        case "linkTool":
          return `
            <a href="${block.data.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">
              ${block.data.meta?.title || block.data.link}
            </a>
          `;

        case "image":
          return `
            <figure class="my-6">
              <img src="${block.data.file.url}" alt="${block.data.caption || ""}" class="rounded-xl w-full" />
              ${
                block.data.caption
                  ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${block.data.caption}</figcaption>`
                  : ""
              }
            </figure>
          `;

        case "embed":
          return `
            <div class="my-6">
              <iframe 
                width="100%" 
                height="400" 
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
    <div className="container py-0 sm:py-15 lg:py-40">
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full lg:h-[80vh] h-auto rounded-2xl object-cover"
        />
      )}

      <div className="py-10">
        <h2 className="text-3xl font-bold mb-6">{blog.title}</h2>

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
