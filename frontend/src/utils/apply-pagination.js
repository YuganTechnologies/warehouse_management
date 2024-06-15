export function applyPagination(documents, page, rowsPerPage) {
  if (!Array.isArray(documents)) {
    documents = [];
  }
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
