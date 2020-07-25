function calcHP(base, iv, ev, lv) {
  return Math.floor((base * 2 + iv + ev / 4) * lv / 100 + lv + 10)
}

function calc(base, iv, ev, lv, cor) {
  return Math.floor(((base * 2 + iv + ev / 4) * lv / 100 + 5) * cor)
}

function calcWhile(val, base, iv, ev, lv, HP, cor) {
  if(HP) {
    return val - calcHP(base, iv, ev, lv)
  } else {
    return val - calc(base, iv, ev, lv, cor)
  }
}
function evcheck(ev, res) {
  if(res.HP + res.A + res.B + res.C + res.D + res.S >= 508) {
    return false
  }
  if(ev < 252) {
    return true
  } else {
    return false
  }
}

function sortAry(ary) {
  for(let i = 0;i < ary.length; i++){
    for(let j = i; j < ary.length; j++){
      let tmp = ary[j]
      if(ary[i].diff > ary[j].diff){
        ary[j] = ary[i]
        ary[i] = tmp
      }
    }
  }
  return ary
}

function calcdiff(base, ivs, lv, plus, minus, value, fixs) {
  let res = {
    HP: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    S: 0,
    diff: 0
  }
  let range = {
    HP: 2,
    A: {
      up: 0,
      norm: 5,
      down: 10
    },
    B: {
      up: 0,
      norm: 5,
      down: 10
    },
    C: {
      up: 0,
      norm: 5,
      down: 10
    },
    D: {
      up: 0,
      norm: 5,
      down: 10
    },
    S: {
      up: 0,
      norm: 5,
      down: 10
    }
  }
  if(fixs.HP) {
    range.HP /= 2
  }
  if(fixs.A) {
    range.A.up = -5
    range.A.down /= 2
    range.A.norm /= 4
  }
  if(fixs.B) {
    range.B.up = -5
    range.B.down /= 2
    range.B.norm /= 4
  }
  if(fixs.C) {
    range.C.up = -5
    range.C.down /= 2
    range.C.norm /= 4
  }
  if(fixs.D) {
    range.D.up = -5
    range.D.down /= 2
    range.D.norm /= 4
  }
  if(fixs.S) {
    range.S.up = -5
    range.S.down /= 2
    range.S.norm /= 4
  }
  while (calcWhile(value.HP, base.HP, ivs.HP, res.HP, lv, true, 1.0) > range.HP) {
    res.HP += 4
    if(!evcheck(res.HP, res)) {
      break
    }
  }
  let diff = calcWhile(value.HP, base.HP, ivs.HP, res.HP, lv, true, 1.0)
  if (plus === 'A') {
    while (calcWhile(value.A, base.A, ivs.A, res.A, lv, false, 1.1) > range.A.up) {
      res.A += 4
      if(!evcheck(res.A, res)) {
        break
      }
    }
    diff += calcWhile(value.A, base.A, ivs.A, res.A, lv, false, 1.1)
  } else if (minus === 'A'){
    while (calcWhile(value.A, base.A, ivs.A, res.A, lv, false, 0.9) > range.A.down) {
      res.A += 4
      if(!evcheck(res.A, res)) {
        break
      }
    }
    diff += calcWhile(value.A, base.A, ivs.A, res.A, lv, false, 0.9)
  } else {
    while (calcWhile(value.A, base.A, ivs.A, res.A, lv, false, 1.0) > range.A.norm) {
      res.A += 4
      if(!evcheck(res.A, res)) {
        break
      }
    }
    diff += calcWhile(value.A, base.A, ivs.A, res.A, lv, false, 1.0)
  }
  if(plus === 'B') {
    while (calcWhile(value.B, base.B, ivs.B, res.B, lv, false, 1.1) > range.B.up) {
      res.B += 4
      if(!evcheck(res.B, res)) {
        break
      }
    }
    diff += calcWhile(value.B, base.B, ivs.B, res.B, lv, false, 1.1)
  } else if (minus === 'B'){
    while (calcWhile(value.B, base.B, ivs.B, res.B, lv, false, 0.9) > range.B.down) {
      res.B += 4
      if(!evcheck(res.B, res)) {
        break
      }
    }
    diff += calcWhile(value.B, base.B, ivs.B, res.B, lv, false, 0.9)
  } else {
    while (calcWhile(value.B, base.B, ivs.B, res.B, lv, false, 1.0) > range.B.norm) {
      res.B += 4
      if(!evcheck(res.B, res)) {
        break
      }
    }
    diff += calcWhile(value.B, base.B, ivs.B, res.B, lv, false, 1.0)
  }
  if(plus === 'C') {
    while (calcWhile(value.C, base.C, ivs.C, res.C, lv, false, 1.1) > range.C.up) {
      res.C += 4
      if(!evcheck(res.C, res)) {
        break
      }
    }
    diff += calcWhile(value.C, base.C, ivs.C, res.C, lv, false, 1.1)
  } else if (minus === 'C'){
    while (calcWhile(value.C, base.C, ivs.C, res.C, lv, false, 0.9) > range.C.down) {
      res.C += 4
      if(!evcheck(res.C, res)) {
        break
      }
    }
    diff += calcWhile(value.C, base.C, ivs.C, res.C, lv, false, 0.9)
  } else {
    while (calcWhile(value.C, base.C, ivs.C, res.C, lv, false, 1.0) > range.C.norm) {
      res.C += 4
      if(!evcheck(res.C, res)) {
        break
      }
    }
    diff += calcWhile(value.C, base.C, ivs.C, res.C, lv, false, 1.0)
  }
  if(plus === 'D') {
    while (calcWhile(value.D, base.D, ivs.D, res.D, lv, false, 1.1) > range.D.up) {
      res.D += 4
      if(!evcheck(res.D, res)) {
        break
      }
    }
    diff += calcWhile(value.D, base.D, ivs.D, res.D, lv, false, 1.1)
  } else if (minus === 'D'){
    while (calcWhile(value.D, base.D, ivs.D, res.D, lv, false, 0.9) > range.D.down) {
      res.D += 4
      if(!evcheck(res.D, res)) {
        break
      }
    }
    diff += calcWhile(value.D, base.D, ivs.D, res.D, lv, false, 0.9)
  } else {
    while (calcWhile(value.D, base.D, ivs.D, res.D, lv, false, 1.0) > range.D.norm) {
      res.D += 4
      if(!evcheck(res.D, res)) {
        break
      }
    }
    diff += calcWhile(value.D, base.D, ivs.D, res.D, lv, false, 1.0)
  }
  if(plus === 'S') {
    while (calcWhile(value.S, base.S, ivs.S, res.S, lv, false, 1.1) > range.S.up) {
      res.S += 4
      if(!evcheck(res.S, res)) {
        break
      }
    }
    diff += calcWhile(value.S, base.S, ivs.S, res.S, lv, false, 1.1)
  } else if (minus === 'S'){
    while (calcWhile(value.S, base.S, ivs.S, res.S, lv, false, 0.9) > range.S.down) {
      res.S += 4
      if(!evcheck(res.S, res)) {
        break
      }
    }
    diff += calcWhile(value.S, base.S, ivs.S, res.S, lv, false, 0.9)
  } else {
    while (calcWhile(value.S, base.S, ivs.S, res.S, lv, false, 1.0) > range.S.norm) {
      res.S += 4
      if(!evcheck(res.S, res)) {
        break
      }
    }
    diff += calcWhile(value.S, base.S, ivs.S, res.S, lv, false, 1.0)
  }
  res.diff = diff
  return res
}

export default function other(pokemon, char, ivs, value, chars, lv, fixs){
  let res = []
  for(let i = 0;i < chars.length; i++){
    if(char.char !== chars[i].char){
      let tmp = calcdiff(pokemon, ivs, lv, chars[i].plus, chars[i].minus, value, fixs)
      tmp.char = chars[i].char
      res.push(tmp)
    }
  }
  res = sortAry(res)
  return res
}

