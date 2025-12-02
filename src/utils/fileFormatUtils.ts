/**
 * Maps file MIME types to the document format required by the API
 */
export type DocumentFormat = 
  | 'PDF' 
  | 'MS_WORD' 
  | 'ZIP' 
  | 'X_GZIP' 
  | 'X_COMPRESSED' 
  | 'DOCX' 
  | 'RTF' 
  | 'PLAIN' 
  | 'XLSX' 
  | 'JPEG_IMAGE' 
  | 'MP4' 
  | 'PNG_IMAGE' 
  | 'GIF_IMAGE' 
  | 'BMP_IMAGE' 
  | 'WEBP_IMAGE' 
  | 'SVG_IMAGE' 
  | 'MPEG_AUDIO' 
  | 'OTHER' 
  | 'CSV' 
  | 'JSON';

/**
 * Maps file MIME types and extensions to API document formats
 */
export const getDocumentFormat = (file: File): DocumentFormat => {
  const { type, name } = file;
  const extension = name.split('.').pop()?.toLowerCase();

  // Check by MIME type first
  if (type.includes('application/pdf')) {
    return 'PDF';
  }
  
  if (type.includes('application/msword')) {
    return 'MS_WORD';
  }
  
  if (type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
    return 'DOCX';
  }
  
  if (type.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    return 'XLSX';
  }
  
  if (type.includes('application/rtf')) {
    return 'RTF';
  }
  
  if (type.includes('text/plain')) {
    return 'PLAIN';
  }
  
  if (type.includes('text/csv')) {
    return 'CSV';
  }
  
  if (type.includes('application/json')) {
    return 'JSON';
  }
  
  if (type.includes('application/zip')) {
    return 'ZIP';
  }
  
  if (type.includes('application/gzip')) {
    return 'X_GZIP';
  }
  
  if (type.includes('application/x-compress')) {
    return 'X_COMPRESSED';
  }
  
  if (type.includes('image/jpeg')) {
    return 'JPEG_IMAGE';
  }
  
  if (type.includes('image/png')) {
    return 'PNG_IMAGE';
  }
  
  if (type.includes('image/gif')) {
    return 'GIF_IMAGE';
  }
  
  if (type.includes('image/bmp')) {
    return 'BMP_IMAGE';
  }
  
  if (type.includes('image/webp')) {
    return 'WEBP_IMAGE';
  }
  
  if (type.includes('image/svg+xml')) {
    return 'SVG_IMAGE';
  }
  
  if (type.includes('video/mp4')) {
    return 'MP4';
  }
  
  if (type.includes('audio/mpeg')) {
    return 'MPEG_AUDIO';
  }

  // Fallback to file extension if MIME type is not recognized
  switch (extension) {
    case 'pdf':
      return 'PDF';
    case 'doc':
      return 'MS_WORD';
    case 'docx':
      return 'DOCX';
    case 'xlsx':
      return 'XLSX';
    case 'rtf':
      return 'RTF';
    case 'txt':
      return 'PLAIN';
    case 'csv':
      return 'CSV';
    case 'json':
      return 'JSON';
    case 'zip':
      return 'ZIP';
    case 'gz':
      return 'X_GZIP';
    case 'z':
      return 'X_COMPRESSED';
    case 'jpg':
    case 'jpeg':
      return 'JPEG_IMAGE';
    case 'png':
      return 'PNG_IMAGE';
    case 'gif':
      return 'GIF_IMAGE';
    case 'bmp':
      return 'BMP_IMAGE';
    case 'webp':
      return 'WEBP_IMAGE';
    case 'svg':
      return 'SVG_IMAGE';
    case 'mp4':
      return 'MP4';
    case 'mp3':
      return 'MPEG_AUDIO';
    default:
      return 'OTHER';
  }
};

/**
 * Validates if a file type is supported for document upload
 */
export const isSupportedFileType = (file: File): boolean => {
  const supportedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/rtf',
    'text/plain',
    'text/csv',
    'application/json',
    'application/zip',
    'application/gzip',
    'application/x-compress',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/svg+xml',
    'video/mp4',
    'audio/mpeg'
  ];

  const supportedExtensions = [
    'pdf', 'doc', 'docx', 'xlsx', 'rtf', 'txt', 'csv', 'json',
    'zip', 'gz', 'z', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 
    'webp', 'svg', 'mp4', 'mp3'
  ];

  const extension = file.name.split('.').pop()?.toLowerCase();
  
  return supportedTypes.includes(file.type) || 
         (extension ? supportedExtensions.includes(extension) : false);
};

/**
 * Gets a human-readable description of the document format
 */
export const getDocumentFormatDescription = (format: DocumentFormat): string => {
  const descriptions: Record<DocumentFormat, string> = {
    'PDF': 'PDF Document',
    'MS_WORD': 'Microsoft Word Document',
    'DOCX': 'Microsoft Word Document (DOCX)',
    'XLSX': 'Microsoft Excel Spreadsheet',
    'RTF': 'Rich Text Format',
    'PLAIN': 'Plain Text',
    'CSV': 'Comma Separated Values',
    'JSON': 'JSON Data',
    'ZIP': 'ZIP Archive',
    'X_GZIP': 'GZIP Archive',
    'X_COMPRESSED': 'Compressed Archive',
    'JPEG_IMAGE': 'JPEG Image',
    'PNG_IMAGE': 'PNG Image',
    'GIF_IMAGE': 'GIF Image',
    'BMP_IMAGE': 'BMP Image',
    'WEBP_IMAGE': 'WebP Image',
    'SVG_IMAGE': 'SVG Image',
    'MP4': 'MP4 Video',
    'MPEG_AUDIO': 'MPEG Audio',
    'OTHER': 'Other File Type'
  };

  return descriptions[format] || 'Unknown Format';
};
