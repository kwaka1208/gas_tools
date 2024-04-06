function removeFolderPermissions(folderId) {
  var folder = DriveApp.getFolderById(folderId);
  removePermissionsRecursive(folder);
}

function removePermissionsRecursive(folder) {
  // Remove permissions for the folder itself
  var permissions = folder.getSharingAccess();
  if (permissions != DriveApp.Access.NONE) {
    folder.setSharing(DriveApp.Access.NONE, DriveApp.Permission.NONE);
  }
  
  // Remove permissions for files in the folder
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    var filePermissions = file.getSharingAccess();
    if (filePermissions != DriveApp.Access.NONE) {
      file.setSharing(DriveApp.Access.NONE, DriveApp.Permission.NONE);
    }
  }
  
  // Recursively remove permissions for subfolders
  var subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    removePermissionsRecursive(subfolder);
  }
}
