export const FACE_LANDMARKS = {
    // Lips
    LIPS_OUTER: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146],
    LIPS_INNER: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95],

    // Eyes
    LEFT_EYE: [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7],
    RIGHT_EYE: [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382],

    // Eyebrows
    LEFT_EYEBROW: [70, 63, 105, 66, 107, 55, 65, 52, 53, 46],
    RIGHT_EYEBROW: [336, 296, 334, 293, 300, 276, 283, 282, 295, 285],

    // Ears (for accessories)
    LEFT_EARLOBE: 234, // Approximate attachment point
    RIGHT_EARLOBE: 454  // Approximate attachment point
};

export const MESH_TRIANGULATION_INDICES = [
    // We can populate this later if we need custom triangulation, 
    // or rely on predefined MediaPipe canonical face mesh index buffer.
];
