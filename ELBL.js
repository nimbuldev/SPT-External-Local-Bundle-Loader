const { join } = require('path');
const fs = require('fs');
const process = require('process');
const readline = require('readline');

const modsPath = "./user/mods";

function confirm(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question(question, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function start() {
    if (!fs.existsSync(modsPath)) {
        console.log("/user/mods not found, did you run this in the root SPT folder?");
        await confirm("Press enter to exit...");
        process.exit(1);
    }

    for (const mod of fs.readdirSync(modsPath)) {
        const bundles = join(modsPath, mod, "bundles");
        if (fs.existsSync(bundles)) {
            fs.cpSync(bundles, "./user/cache/bundles", { recursive: true });
            console.log(`Copied bundles from ${mod} to /user/cache/bundles`);
        }
    }
    await confirm("Press enter to exit...");
    process.exit(0);
}
start();