/**
 * @param {Request} request 
 * @param {*} context 
 * @returns 
 */
export async function GET(request) {
  const params = new URLSearchParams(request.url.split('?')[1]);
  const zipcode = params.get("zipcode")
  if (!zipcode || !/^\d{7}$/.test(zipcode)) {
    return new Response('Invalid zipcode', { status: 400 });
  }
  const targetUrl = `https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/${zipcode}.json`;
  const fetchResponse = await fetch(targetUrl)
  if (!fetchResponse.ok) {
    // レスポンスが正常でない場合はエラーメッセージを返す
    return new Response(`HTTP error! Status: ${fetchResponse.status}`, { status: fetchResponse.status });
  }

  const data = await fetchResponse.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    status: 200
  })
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    status: 204
  });
}
