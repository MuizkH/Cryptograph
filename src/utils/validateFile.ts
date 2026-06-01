export function validateFile(file) {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  if (!file) {
    throw new Error("No file selected");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`
    );
  }

  return true;
}