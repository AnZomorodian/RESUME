## Packages
react-to-print | For exporting the resume preview perfectly to PDF
framer-motion | For beautiful page transitions and list animations

## Notes
- We rely on native CSS `@media print` capabilities managed via `react-to-print` to isolate the resume for printing.
- `id` for resumes is assumed to be a `string` (UUID/cuid) based on the schema's `text("id").primaryKey()`.
