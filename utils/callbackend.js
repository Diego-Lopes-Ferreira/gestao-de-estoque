export default async function callBackend(route, method = "GET", data = {}) {
  const config = {
    method: method,
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify(data),
    // mode: "cors",                  // no-cors, *cors, same-origin
    // cache: "no-cache",             // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin",    // include, *same-origin, omit
    // redirect: "follow",            // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };
  if (method != "GET") config.body = JSON.stringify(data);
  let response = await (await fetch(route, config)).json();
  return response.sqlResult;
}
