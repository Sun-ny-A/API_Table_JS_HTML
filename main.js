console.log('Formula 1 Driver Standings')

//const url = 'https://ergast.com/api/f1/2020/1/driverStandings.json?authuser=0'


async function requestInfo(season, round) {
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`, {
        method: "GET"
    })
    //res.ok must be after fetch request, include bad request
    if (res.ok) {
        const data = await res.json()
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    } else window.alert('Bad Request')
}

//addEventListener for form
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form")
    form.addEventListener("submit", async function (e) {
        e.preventDefault()

        const season = document.getElementById("season").value
        const round = document.getElementById("round").value

        const standings = await requestInfo(season, round)
        if (standings) {
            tableInfo(standings)
        }
    })
})

//create table
function tableInfo(standings) {
    const tableBody = document.querySelector("#tableInfo tbody")
    tableBody.innerHTML = ""

    standings.forEach(driver => {
        const row = document.createElement("tr")
        row.innerHTML = `<td>${driver.position}</td>
                        <td>${driver.Driver.givenName} ${driver.Driver.familyName}</td>
                        <td>${driver.Driver.nationality}</td>
                        <td>${driver.points}</td>
                        <td>${driver.wins}</td>
                        <td>${driver.Constructors[0].name}</td>`
        tableBody.appendChild(row)
    })
}