window.addEventListener("load", function () {
    // Title Screen Validation
    document.querySelector("#title-screen").addEventListener("click", function () {
        if (JSON.parse(localStorage.getItem("playerData")) === null) {
            this.style.display = "none";
            runLoad("character-creation", "flex");
        } else {
            this.style.display = "none";
            const player = JSON.parse(localStorage.getItem("playerData"));
            initialLoad(player);
            runLoad("hub", "flex");
        }
    });

    // Submit Name
    document.querySelector("#name-submit").addEventListener("submit", function (e) {
        e.preventDefault();
        let playerName = document.querySelector("#name-input").value;

        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (format.test(playerName)) {
            document.querySelector("#alert").innerHTML = "Your name cannot contain special characters!";
        } else {
            if (playerName.length < 3 || playerName.length > 15) {
                document.querySelector("#alert").innerHTML = "Name should be between 3-15 characters!";
            } else {
                player.name = playerName;
                let playerData = JSON.stringify(player);
                localStorage.setItem("playerData", playerData)
                document.querySelector("#character-creation").style.display = "none";
                initialLoad(player);
                runLoad("hub", "flex");
            }
        }
    });
});

const runLoad = (id, display) => {
    let loader = document.querySelector("#loading");
    loader.style.display = "flex";
    setTimeout(async () => {
        loader.style.display = "none";
        document.querySelector(`#${id}`).style.display = `${display}`;
    }, 1000);
}

const initialLoad = (player) => {
    // Header
    document.querySelector("#player-name").innerHTML = `<i class="fas fa-user"></i>${player.name}`
    document.querySelector("#player-gold").innerHTML = `<i class="fas fa-coins" style="color: #FFD700;"></i>${nFormatter(player.gold)}`
    document.querySelector("#player-cubes").innerHTML = `<i class="fas fa-cube" style="color: #A020F0;"></i>${nFormatter(player.cubes)}`

    // Player Stats
    playerHpElement.innerHTML = nFormatter(player.stats.hp) + "/" + nFormatter(player.stats.hpMax);
    playerAtkElement.innerHTML = nFormatter(player.stats.atk);
    playerDefElement.innerHTML = nFormatter(player.stats.def);
    playerAtkSpdElement.innerHTML = (player.stats.atkSpd).toFixed(1);
    playerVampElement.innerHTML = (player.stats.vamp).toFixed(2) + "%";;
    playerCrateElement.innerHTML = (player.stats.critRate).toFixed(2) + "%";
    playerCdmgElement.innerHTML = (player.stats.critDmg).toFixed(2) + "%";
}