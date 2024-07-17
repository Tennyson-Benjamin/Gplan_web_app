/**
 * Exports given data as a downloadable JSON file.
 *
 * @param data - The data to be exported.
 * @param filename - The name of the file to be downloaded.
 */
export function exportToJsonFile<T>(
  data: T,
  filename: string = "data.json",
): void {
  // Convert the data to a JSON string
  const jsonString = JSON.stringify(data, null, 2); // Pretty print with 2 spaces

  // Create a Blob with the JSON content
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor (`a`) element
  const link = document.createElement("a");

  // Set the download attribute to the filename
  link.download = filename;

  // Set the href to the blob URL
  link.href = url;

  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);

  // Programmatically trigger the download
  link.click();

  // Clean up by revoking the blob URL and removing the link
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}
