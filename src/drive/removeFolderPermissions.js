const owner = ''

function main() {
  folderId = ''
  removeFolderPermissions(folderId)
}

function removeFolderPermissions(folderId) {
  var folder = DriveApp.getFolderById(folderId);
  removePermissionsRecursive(folder);
}

function removePermissionsRecursive(folder) {
  console.log('start folder: ' + folder.getName())
  // 自分がオーナーのフォルダーだけ処理する
  if (folder.getOwner().getEmail() == owner) {
    folder.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.NONE);
    var editors = folder.getEditors()
    for (editor of editors) {
      var target = editor.getEmail()
      if (target != owner) {
        folder.removeEditor(target)
        console.log('removeEditor: ' + target)
      }
    }
    var viewers = folder.getViewers()
    for (viewer of viewers) {
      var target = viewer.getEmail()
      if (target != owner) {
        folder.removeViewer(target)
        console.log('removeViewer: ' + target)
      }
    }

  }

  // Remove permissions for files in the folder
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getOwner().getEmail() == owner) {
      file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.NONE);
      var editors = file.getEditors()
      for (editor of editors) {
        var target = editor.getEmail()
        if (target != owner) {
          file.removeEditor(target)
          console.log('removeEditor: ' + target)
        }
      }
      var viewers = file.getViewers()
      for (viewer of viewers) {
        var target = viewer.getEmail()
        if (target != owner) {
          file.removeViewer(target)
          console.log('removeViewer: ' + target)
        }
      }
    }
  }
  
  // Recursively remove permissions for subfolders
  var subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    removePermissionsRecursive(subfolder);
  }
}
