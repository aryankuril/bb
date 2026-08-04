const fs = require('fs');

const path = './app/components/ClientRegistration/SecondSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// The file might contain multiple occurrences of some words, so I will replace with regular expressions.

console.log("Removing Brand Name...");
const brandNameRegex = /\s*\{\/\* Brand Name  \*\/\}\s*<div\b[^\>]*>[\s\S]*?errors\.brandName\s*&&\s*\([\s\S]*?<\/div>\s*/;
content = content.replace(brandNameRegex, '\n');


console.log("Removing Address...");
const addressRegex = /\s*\{\/\* Address \*\/\}\s*<div\b[^\>]*>[\s\S]*?errors\.address\s*&&\s*\([\s\S]*?<\/div>\s*/;
content = content.replace(addressRegex, '\n');


console.log("Extracting and moving Services...");
const servicesRegex = /(\s*\{\/\* Services \*\/\}\s*<div\b[^\>]*>[\s\S]*?errors\.services\s*&&\s*\([\s\S]*?<\/div>\s*)/;
const servicesMatch = content.match(servicesRegex);

if (servicesMatch) {
    content = content.replace(servicesMatch[0], '\n'); // remove from old place
    // Insert after GSTIN
    const gstinRegex = /(\{\/\* GSTIN \*\/\}\s*<div\b[^\>]*>[\s\S]*?errors\.gstin\s*&&\s*\([\s\S]*?<\/div>\s*)/;
    content = content.replace(gstinRegex, `$1\n${servicesMatch[0]}\n`);
} else {
    console.log("Could not find Services!");
}


console.log("Extracting and moving Contact Person...");
const contactPersonRegex = /(\s*\{\/\* Contact Person \*\/\}\s*<div\b[^\>]*>[\s\S]*?errors\.contactPerson\s*&&\s*\([\s\S]*?<\/div>\s*)/;
const contactPersonMatch = content.match(contactPersonRegex);

if (contactPersonMatch) {
    content = content.replace(contactPersonMatch[0], '\n'); // remove from old place
    // Insert before Email in Step 2 
    // Step 2 starts with <h3 className="text-left  white-text py-8">3. Your contact details</h3>
    const step2EmailRegex = /(\s*\{\/\* Email \*\/\}\s*<div\b[^\>]*>)/;
    content = content.replace(step2EmailRegex, `\n${contactPersonMatch[0]}\n$1`);
} else {
    console.log("Could not find Contact Person!");
}

console.log("Adding Terms & Conditions checkbox...");
const termsCheckbox = `
            {/* Terms and Conditions */}
            <div className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                id="termsAgreed"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                className="w-5 h-5 accent-[var(--color-highlight)] bg-transparent border-2 border-[var(--color-highlight)] rounded cursor-pointer"
              />
              <label htmlFor="termsAgreed" className="white-text text-sm">
                I agree to the <a href="/terms-of-engagement" target="_blank" className="underline text-[var(--color-highlight)]">Terms of Engagement</a>
              </label>
            </div>
            {errors.termsAgreed && (
              <p className="text-red-500 text-xs mt-1">{errors.termsAgreed}</p>
            )}
`;

// Insert after Website
const websiteRegex = /(\{\/\* <label[\s\S]*?Your Website[\s\S]*?<\/label> \*\/\}\s*<div className="relative w-full">[\s\S]*?errors\.website\s*&&\s*\([\s\S]*?<\/div>\s*)/;
content = content.replace(websiteRegex, `$1\n${termsCheckbox}\n`);


console.log("Updating Step Titles...");
content = content.replace(
  /<h3 className="text-left text-lg white-text py-7[^>]*>2. Contact person and service <\/h3>/, 
  ''
);

content = content.replace(
  /<h3 className="text-left  white-text py-8[^>]*>3. Your contact details<\/h3>/,
  '<h3 className="text-left  white-text py-8">2. Your contact details</h3>'
);

content = content.replace(
  /1\. Tell Us about your Business/,
  '1. Tell Us about your Business'
);

content = content.replace(
  /placeholder="Company Name"/g,
  'placeholder="Brand / Company Name"'
);

fs.writeFileSync(path, content, 'utf8');
console.log("Done.");
