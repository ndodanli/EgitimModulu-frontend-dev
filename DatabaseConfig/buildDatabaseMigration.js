var shell = require("shelljs");
var path = require("./buildDatabasePath");

//bu kısımdaki yolu kendi bilgisayarınıza göre ayarlarsınız
shell.cd(path);

shell.echo("Migrasyon basliyor...");
shell.echo(path);
if (shell.rm("-rf", path + "/DataAccess/Migrations/*").code !== 0) {
  shell.echo("Hata olustu, migration dosyasi silinemiyor!");
  shell.exit(1);
}
if (
  shell.exec(
    "dotnet ef migrations add database-test-m -p DataAccess/ -s EgitimModuluApp/"
  ).code !== 0
) {
  shell.echo("Hata olustu!");
  shell.exit(1);
}
