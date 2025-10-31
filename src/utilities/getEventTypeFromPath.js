module.exports = (filePath, cwd) => {
  // Normalize path separators for Windows
  const normalizedPath = filePath.replace(/\\/g, '/');
  const normalizedCwd = cwd.replace(/\\/g, '/');

  // Get relative path and extract parts
  const relativePath = normalizedPath.replace(normalizedCwd, '');

  const pathParts = relativePath.split('/').filter(part => part);

  // The event type should be the first directory name
  const eventType = pathParts[0];
  return eventType;
};
