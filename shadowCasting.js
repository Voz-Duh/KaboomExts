const shd_range = 100000

function drawShadowLine(lpos, p1, p2, pos, color, any = false) {
	let a = p1.sub(p2).unit().cross(pos.add(p1.sub(lpos)))
	let na = lpos.sub(pos.add(p1)).unit()
	let nb = lpos.sub(pos.add(p2)).unit()
	let ha = a > 0
	if (ha || any) {
		drawPolygon({
		    pts: [
				p2,
				p2.add(nb.scale(-shd_range)),
				p1.add(na.scale(-shd_range)),
				p1
		    ],
		    pos: pos,
		    color: color,
		})
	}
}

function drawShadowTriangle(lpos, p1, p2, p3, pos, color) {
	let i = p1.sub(p2).unit().cross(p1.sub(p3)) > 0
	let a = p1.sub(p2).unit().cross(pos.add(p1.sub(lpos)))
	let b = p2.sub(p3).unit().cross(pos.add(p2.sub(lpos)))
	let c = p3.sub(p1).unit().cross(pos.add(p3.sub(lpos)))
	if (i) {
		a = -a
		b = -b
		c = -c
	}
	let na = lpos.sub(pos.add(p1)).unit()
	let nb = lpos.sub(pos.add(p2)).unit()
	let nc = lpos.sub(pos.add(p3)).unit()
	let ha = a > 0
	let hb = b > 0
	let hc = c > 0
	const shd_c = function () {
		drawPolygon({
		    pts: [
				p1,
				p1.add(na.scale(-shd_range)),
				p3.add(nc.scale(-shd_range)),
				p3
		    ],
		    pos: pos,
		    color: color,
		})
	}
	const shd_a = function () {
		drawPolygon({
		    pts: [
				p2,
				p2.add(nb.scale(-shd_range)),
				p1.add(na.scale(-shd_range)),
				p1
		    ],
		    pos: pos,
		    color: color,
		})
	}
	const shd_b = function () {
		drawPolygon({
		    pts: [
				p3,
				p3.add(nc.scale(-shd_range)),
				p2.add(nb.scale(-shd_range)),
				p2
		    ],
		    pos: pos,
		    color: color,
		})
	}
	if (ha && hb) shd_c()
	else if (hb && hc) shd_a()
	else if (hc && ha) shd_b()
	else if (ha) {
		shd_c()
		shd_b()
	}
	else if (hb) {
		shd_c()
		shd_a()
	}
	else if (hc) {
		shd_b()
		shd_a()
	}
	else {
		shd_a()
		shd_b()
		shd_c()
	}
}

function drawShadowPolygon(lpos, pts, pos, color) {
	for (let i = 0; i < pts.length; i++) {
		drawShadowLine(lpos, pts[i], pts[(i == pts.length-1 ? -1 : i)+1], pos, color)
	}
}

function drawShadowLines(lpos, pts, pos, color) {
	for (let i = 0; i < pts.length; i++) {
		drawShadowLine(lpos, pts[i], pts[(i == pts.length-1 ? -1 : i)+1], pos, color, true)
	}
}
