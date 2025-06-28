const inputEl = document.getElementById("inputEl");
const convertBtn = document.getElementById("convert-btn");
const lengthResult = document.getElementById("lengthResult");
const valumeResult = document.getElementById("valumeResult");
const massResult = document.getElementById("massResult");


convertBtn.addEventListener("click", () => {

    const value = inputEl.value

    //Length convertion
    const meterTofeet = (value * 3.28084).toFixed(3);
    const feetTometer = (value * 0.3048).toFixed(3);
    lengthResult.textContent = `${value} meters = ${meterTofeet} feet | ${value} feet = ${feetTometer} meters`

    //volume conversion

    const literTogallon = (value * 0.264172).toFixed(3);
    const gallonToliter = (value * 3.78541).toFixed(3);
    valumeResult.textContent = `${value} liters = ${literTogallon} gallons | ${value} gallons = ${gallonToliter} liters`;

    //mass conversion

    const kiloTopounds = (value * 2.20462).toFixed(3);
    const poundTokilos = (value * 0.453592).toFixed(3);
    massResult.textContent = `${value} kilos = ${kiloTopounds} pounds | ${value} pounds = ${poundTokilos} kilos`;

})