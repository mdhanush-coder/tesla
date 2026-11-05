function pointingHand(x, tip, s, a) {
  // flat-vector pointing hand (back of the hand to camera): fist with folded fingers, extended index, tucked thumb, cuff + sleeve.
  // Local frame: fingertip at the origin, the hand extends along +y; rotated so the arm comes from the lower right (ang 1.0).
  if (a <= 0) return;
  const ang = 1.0, u = s * 0.01, SK = HUM.skin;
  x.save(); x.globalAlpha *= a; x.translate(tip[0], tip[1]); x.rotate(ang - Math.PI / 2);
  limbStroke(x, [[4.2 * u, 33 * u], [8 * u, 100 * u]], 15 * u, HUM.hood);                                   // sleeve
  flatShade(x, () => rr(x, -3.6 * u, 27.5 * u, 16 * u, 6.5 * u, 3 * u), ['#3b4a9a', '#1f2a6e', '#121a4a'], 0.6 * u); // cuff
  flatShade(x, () => rr(x, -3.2 * u, 12.6 * u, 15 * u, 16.6 * u, 5.6 * u), SK, 0.9 * u);                     // fist
  x.strokeStyle = H.rgba(H.mix(SK[1], SK[2], 0.6), 0.75); x.lineWidth = 0.75 * u; x.lineCap = 'round';
  for (const kx of [4.4, 8.2]) { x.beginPath(); x.moveTo(kx * u, 13.4 * u); x.lineTo(kx * u, 18.6 * u); x.stroke(); } // folded-finger gaps
  x.beginPath(); x.moveTo(1.6 * u, 19.6 * u); x.quadraticCurveTo(6.4 * u, 21.4 * u, 11.2 * u, 19.4 * u); x.stroke();  // knuckle line
  x.fillStyle = H.rgba(SK[0], 0.55); for (const kx of [2.6, 6.3, 9.9]) { x.beginPath(); x.ellipse(kx * u, 15 * u, 1.3 * u, 0.8 * u, 0, 0, TAU); x.fill(); } // knuckle shine
  flatShade(x, () => rr(x, -2.5 * u, -0.4 * u, 5 * u, 17.4 * u, 2.5 * u), SK, 0.6 * u);                      // index finger
  x.beginPath(); x.moveTo(-1.6 * u, 6.2 * u); x.quadraticCurveTo(0, 6.9 * u, 1.6 * u, 6.2 * u); x.moveTo(-1.6 * u, 10.8 * u); x.quadraticCurveTo(0, 11.5 * u, 1.6 * u, 10.8 * u); x.stroke(); // joints
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.ellipse(0, 1.9 * u, 1.45 * u, 1.9 * u, 0, 0, TAU); x.fill();   // nail
  x.save(); x.translate(-1.4 * u, 22.4 * u); x.rotate(-0.75); flatShade(x, () => rr(x, -2.4 * u, -2.2 * u, 9 * u, 4.4 * u, 2.2 * u), SK, 0.5 * u); x.restore(); // thumb tucked across
  x.restore();
}
