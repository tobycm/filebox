import {
  IconAlertTriangle,
  IconArrowDown,
  IconBox,
  IconBrandGit,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandPython,
  IconBrandRust,
  IconBrandUbuntu,
  IconBrandWindows,
  IconChevronDown,
  IconChevronRight,
  IconClipboardPlus,
  IconCopy,
  IconCube,
  IconDatabase,
  IconDownload,
  IconEraser,
  IconEyeOff,
  IconFile,
  IconFileCode,
  IconFileText,
  IconFileTypeDocx,
  IconFileTypePdf,
  IconFileTypeXls,
  IconFileZip,
  IconFolder,
  IconFolderOpen,
  IconFolderPlus,
  IconFolderUp,
  IconInfoCircle,
  IconKey,
  IconLayoutGrid,
  IconLayoutGridAdd,
  IconLayoutList,
  IconLicense,
  IconLink,
  IconList,
  IconLock,
  IconMinus,
  IconMusic,
  IconPhoto,
  IconRun,
  IconSearch,
  IconSettings,
  IconShare,
  IconSortAscending2,
  IconSortDescending2,
  IconTerminal,
  IconToggleLeft,
  IconToggleRight,
  IconTrash,
  IconUpload,
  IconUsers,
  IconVideo,
  IconX,
} from "@tabler/icons-react";

const IconMap = {
  // Misc
  loading: IconSettings,
  dropdown: IconChevronDown,
  placeholder: IconMinus,

  // Drag & Drop
  dndDragging: IconRun,
  dndCanDrop: IconArrowDown,
  dndCannotDrop: IconX,

  // File Actions
  openFiles: IconBox,
  openParentFolder: IconFolderUp,
  copy: IconCopy,
  paste: IconClipboardPlus,
  share: IconShare,
  search: IconSearch,
  selectAllFiles: IconCube,
  clearSelection: IconEraser,

  // Sorting & view
  sortAsc: IconSortAscending2,
  sortDesc: IconSortDescending2,
  toggleOn: IconToggleRight,
  toggleOff: IconToggleLeft,

  // File view modes
  list: IconList,
  compact: IconLayoutList,
  smallThumbnail: IconLayoutGrid,
  largeThumbnail: IconLayoutGridAdd,

  // File system
  folder: IconFolder,
  folderCreate: IconFolderPlus,
  folderOpen: IconFolderOpen,
  folderChainSeparator: IconChevronRight,
  download: IconDownload,
  upload: IconUpload,
  trash: IconTrash,
  fallbackIcon: IconAlertTriangle,

  // File modifiers
  symlink: IconLink,
  hidden: IconEyeOff,

  // File types
  file: IconFile,
  license: IconLicense,
  code: IconFileCode,
  config: IconSettings,
  model: IconCube,
  database: IconDatabase,
  text: IconFileText,
  archive: IconFileZip,
  image: IconPhoto,
  video: IconVideo,
  music: IconMusic,
  terminal: IconTerminal,
  users: IconUsers,
  info: IconInfoCircle,
  key: IconKey,
  lock: IconLock,

  // OS
  ubuntu: IconBrandUbuntu,
  windows: IconBrandWindows,

  // Languages
  python: IconBrandPython,
  php: IconBrandPhp,
  nodejs: IconBrandNodejs,
  rust: IconBrandRust,

  // Tools
  git: IconBrandGit,

  // Other formats
  pdf: IconFileTypePdf,
  excel: IconFileTypeXls,
  word: IconFileTypeDocx,
};

export default IconMap;
