const
    fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    readline = require('readline');
require('colors');

function slm(aa, bb, app) {
    fs.readFile(aa, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        if (data.trim() !== bb) {
            console.log(`Le fichier index.js de ${app} contient autre chose que le code de base. (Conseil : Changez votre mot de passe)\nRéinitialisation en cours...`.red);

            fs.writeFile(aa, bb, 'utf8', (cc) => {
                if (cc) {
                    console.error(`Erreur lors de la réinitialisation du fichier ${app} : ` + cc);
                    return;
                }
                console.log(`Le fichier index.js de ${app} a été réinitialisé avec succès !`.green);
            });
        } else {
            console.log(`Le fichier index.js de ${app} contient le code de base !`.green);
        }
    });
}

function bandite(dd) {
    fs.readdir(dd, (err, files) => {
        if (err) {
            console.error('Une erreur s\'est produite :', err);
            return;
        }

        console.log('\nContenu du répertoire "Startup" :\n');
        if (files.length === 0) {
            console.log('Le répertoire est vide.');
        } else {
            files.forEach((ee) => {
                const
                    ff = path.join(dd, ee),
                    gg = fs.statSync(ff).isDirectory(),
                    hh = gg ? '(Dossier)'.yellow : '(Fichier)'.cyan;

                if (path.extname(ee) === '.ini') {
                    console.log(`${ee}` + ' ' + `(Fichier de base Windows)`.magenta);
                } else {
                    console.log(`${ee} ${hh}`);
                }
            });
        }
        stop();
    });
}

const
    user = process.env.LOCALAPPDATA || `${(__dirname.split(":")[0])}:/Users/${(__dirname.split("\\")[2])}/AppData/Local`,
    user2 = process.env.APPDATA || `${(__dirname.split(":")[0])}:/Users/${(__dirname.split("\\")[2])}/AppData`,
    bectance = "module.exports = require('./core.asar');",
    folder = path.join(user2, 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');

function hey(ii, jj) {
    glob(jj, (err, files) => {
        if (err) {
            console.error(`Erreur lors de la recherche du fichier index.js pour ${ii} :`, err);
            return;
        }
        if (files.length > 0) {
            const crapule = files[0];
            slm(crapule, bectance, ii);
        } else {
            console.error(`Aucun fichier index.js trouvé pour ${ii}.`);
            stop();
        }
    });
}

function stop() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\nAppuyez sur n\'importe quelle touche pour fermer le terminal...'.cyan, () => {
        rl.close();
        process.exit(0);
    });
}

hey('Discord', path.join(user, 'Discord', 'app-*', 'modules', 'discord_desktop_core-*', 'discord_desktop_core', 'index.js'));
hey('Discord Canary', path.join(user, 'DiscordCanary', 'app-*', 'modules', 'discord_desktop_core-*', 'discord_desktop_core', 'index.js'));

setTimeout(() => {
    bandite(folder);
}, 3000);