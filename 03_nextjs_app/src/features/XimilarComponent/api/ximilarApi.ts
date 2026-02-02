import { XIMILAR_API_TOKEN, XIMILAR_API_URL } from '../config';
import { XimilarRequest, XimilarResponse } from '../types';

export async function removeBackground(base64Image: string): Promise<XimilarResponse> {
  if (!XIMILAR_API_TOKEN) {
    throw new Error('XIMILAR_API_TOKEN is not defined');
  }

  const baseUrl = XIMILAR_API_URL || 'https://api.ximilar.com/removebg/precise/removebg';
  const url = baseUrl.endsWith('/removebg') || baseUrl.endsWith('/removebg/') 
    ? baseUrl 
    : baseUrl.includes('/removebg/') 
      ? baseUrl 
      : `${baseUrl.replace(/\/$/, '')}/removebg/precise/removebg`;

  const body: XimilarRequest = {
    records: [
      {
        _base64: base64Image,
        binary_mask: false,
        white_background: false,
      },
    ],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${XIMILAR_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.status?.text || `Ximilar API error: ${response.statusText}`);
  }

  return response.json();
}
