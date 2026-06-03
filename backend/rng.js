// backend/rng.js
let x = (Date.now() % 90000) + 10000;
const a = 1103515245;
const c = 12345;
const m = Math.pow(2, 31);

const next = () => {
    x = (a * x + c) % m;
    return x / m;
};

module.exports = {
    getUniform: (min, max) => Number(min) + next() * (Number(max) - Number(min)),
    getNormal: (mu, sigma) => {
        let u1 = next();
        let u2 = next();
        if (u1 <= 0) u1 = 0.0000001;

        let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return (z * Number(sigma)) + Number(mu);
    },
    getExponential: (media) => -Number(media) * Math.log(1 - next()),
    // NUEVO: Distribución Binomial enlazada a tu semilla estocástica
    getBinomial: (n, p) => {
        let exitos = 0;
        for (let i = 0; i < Math.round(Number(n)); i++) {
            if (next() < Number(p)) exitos++;
        }
        return exitos;
    }
};