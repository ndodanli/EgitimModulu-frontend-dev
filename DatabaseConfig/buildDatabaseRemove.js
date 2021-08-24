var shell = require("shelljs");
var path = require("./buildDatabasePath");
//bu kısımdaki yolu kendi bilgisayarınıza göre ayarlarsınız
shell.cd(path);

shell.echo("Migrasyon kaldiriliyor...");
if (
  shell.exec(
    "dotnet ef migrations remove -p DataAccess/ -s EgitimModuluApp/"
  ).code !== 0
) {
  shell.echo("Hata olustu!");
  shell.exit(1);
}
