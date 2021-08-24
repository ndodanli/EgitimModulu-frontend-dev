var shell = require("shelljs");
var path = require("./buildDatabasePath");

//bu kısımdaki yolu kendi bilgisayarınıza göre ayarlarsınız
shell.cd(path);

shell.echo("Database guncelleniyor...");
if (
  shell.exec(
    "dotnet ef database update -p DataAccess/ -s EgitimModuluApp/"
  ).code !== 0
) {
  shell.echo("Hata olustu!");
  shell.exit(1);
}
