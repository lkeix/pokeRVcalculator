function calcHP(base, iv, ev, lv) {
    return Math.floor((base * 2 + iv + ev / 4) * lv / 100 + lv + 10)
}

function calc(base, iv, ev, lv, plus) {
    return Math.floor(((base * 2 + iv + ev / 4) * lv / 100 + 5) * plus)
}

export default function pokecalc(base, ivs, evs, lv, plus, minus) {
    let res = {}
    res.HP = calcHP(base.HP, ivs.HP, evs.HP, lv)
    if (plus === 'A') {
        res.A = calc(base.A, ivs.A, evs.A, lv, 1.1)
    } else {
        res.A = calc(base.A, ivs.A, evs.A, lv, 1.0)
    }
    if(plus === 'B') {
        res.B = calc(base.B, ivs.B, evs.B, lv, 1.1)
    } else {
        res.B = calc(base.B, ivs.B, evs.B, lv, 1.0)
    }
    if(plus === 'C') {
        res.C = calc(base.C, ivs.C, evs.C, lv, 1.1)
    } else {
        res.C = calc(base.C, ivs.C, evs.C, lv, 1.0)
    }
    if(plus === 'D') {
        res.D = calc(base.D, ivs.D, evs.D, lv, 1.1)
    } else {
        res.D = calc(base.D, ivs.D, evs.D, lv, 1.0)
    }
    if(plus === 'S') {
        res.S = calc(base.S, ivs.S, evs.S, lv, 1.1)
    } else {
        res.S = calc(base.S, ivs.S, evs.S, lv, 1.0)
    }
    if (minus === 'A') {
        res.A = calc(base.A, ivs.A, evs.A, lv, 0.9)
    } else if(minus === 'B') {
        res.B = calc(base.B, ivs.B, evs.B, lv, 0.9)
    } else if(minus === 'C') {
        res.C = calc(base.C, ivs.C, evs.C, lv, 0.9)
    } else if(minus === 'D') {
        res.D = calc(base.D, ivs.D, evs.D, lv, 0.9)
    } else if(minus === 'S') {
        res.S = calc(base.S, ivs.S, evs.S, lv, 0.9)
    }
    return res
}
