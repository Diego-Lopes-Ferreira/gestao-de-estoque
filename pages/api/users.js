import prisma from '../../prisma/client';

export const config = {
  api: { bodyParser: true },
};
async function create(user) {
  const { name, sector } = user;
  let sqlResult = {};
  try {
    sqlResult = await prisma.user.create({
      data: {
        name, sector
      }
    });
  } catch (err) { console.warn(err); }

  if (sqlResult == {}) return [400, { message: "Imcompatilbe parameters. Expected '{name, sector}'" }];

  return [200, { sqlResult }];
}

async function read(id) {
  let sqlResult = {};
  try { sqlResult = await prisma.user.findUnique({ where: { id } }); }
  catch (err) { console.warn(err); }

  if (sqlResult == {}) return [400, { message: `Could not find user with id: ${id}` }];

  return [200, { sqlResult }];
}

async function reads() {
  let sqlResult = {};
  try {
    sqlResult = await prisma.user.findMany();
  } catch (err) { console.warn(err); }

  if (sqlResult == {}) return [500, { message: "" }];

  return [200, { sqlResult }];
}

async function update(user) {
  const { id, name, sector } = user;
  console.log(id);
  let sqlResult = {};
  try {
    sqlResult = await prisma.user.update({
      where: { id },
      data: { id, name, sector }
    });
  } catch (err) {
    console.warn(err);
    return [500, { message: `Could not update user` }];
  }

  if (sqlResult == {}) return [400, { message: `Could not update user` }];

  return [200, { sqlResult }];
}

async function deleteUser(id) {
  let sqlResult = {};
  try { sqlResult = await prisma.user.delete({ where: { id } }); }
  catch (err) { console.warn(err); }

  if (sqlResult == {}) return [400, { message: `Could not find user with id: ${id}` }];
  return [200, { sqlResult }];
}

export default async function handler(req, res) {
  const { method, body } = req;
  let result = [];
  if (method === "GET" && body.id == undefined) result = await reads();
  else if (method === "GET") result = await read(body.id);
  else if (method === "POST") result = await create(body);
  else if (method === "PUT") result = await update(body);
  else if (method === "DELETE") result = await deleteUser(body.id);
  const [status, message] = result;
  res.status(status).json(message);
}
