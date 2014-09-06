var id = [];
db.fs.files.find().forEach(
  function(doc) {
    id.push(doc['_id']);
  }
);

db.fs.chunks.remove({ 'files_id': { '$nin': id } });
