import fs from 'fs';

export const POST = async ({ request, url }) => {
  const isProd = import.meta.env.PROD;
  const pathData = (!isProd ? 'public/' : '') + 'data/football/';
  try{
    if (request.headers.get("Content-Type") === "application/json") {
      
      const body = await request.json();

      if (body){
        
        let fixtures = JSON.stringify(body.fixtures, null, 2);
        let standings = JSON.stringify(body.standings, null, 2);

        if (!fixtures  || !standings){
          return new Response(JSON.stringify({
            message: "Inconsistent json structure"
          }), {
            status: 400
          })

        }

        fs.writeFileSync(pathData+'fixtures.json', fixtures);
        fs.writeFileSync(pathData+'standings.json', standings);

        return new Response(JSON.stringify({
          message: "JSON saved successfully"
        }), {
          status: 200
        })
      }
  
    }
  }catch(e){
    console.log(e.message);;
  }

  return new Response(null, { status: 400 });
};


