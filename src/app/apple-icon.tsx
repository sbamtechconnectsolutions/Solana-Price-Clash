import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #9945FF 0%, #F472B6 50%, #FB923C 100%)',
            borderRadius: 24,
            width: 120,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(153, 69, 255, 0.5)',
          }}
        >
          ⚡
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
