import prisma from '../../prisma/client';

export const config = { api: { bodyParser: true } };

async function create(transaction) {
  const { date, quantity, productId, userId } = transaction;
  let sqlResult = {};
  try {
    sqlResult = await prisma.transaction.create({
      data: { date, quantity, productId, userId }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not create transaction" }];
  }
  return [200, { sqlResult }];
}

async function read(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.transaction.findUnique({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not find transaction with id: ${id}` }];
  }
  return [200, { sqlResult }];
}

async function reads() {
  let sqlResult = {};
  try {
    sqlResult = await prisma.transaction.findMany({ orderBy: [{ date: 'desc' }] });
  } catch (err) {
    console.warn(err);
    return [500, { message: "Reads transactions" }];
  }
  return [200, { sqlResult }];
}

async function update(transaction) {
  const { id, date, quantity, productId, userId } = transaction;
  let sqlResult = {};
  try {
    sqlResult = await prisma.transaction.update({
      where: { id },
      data: { id, date, quantity, productId, userId }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not update transaction" }];
  }
  return [200, { sqlResult }];
}

async function deleteTransaction(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.transaction.delete({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not delete transaction with id: ${id}` }];
  }
  return [200, { sqlResult }];
}

export default async function handler(req, res) {
  const { method, body } = req;
  let result = [];
  if (method === "GET" && body.id == undefined) result = await reads();
  else if (method === "GET") result = await read(body.id);
  else if (method === "POST") result = await create(body);
  else if (method === "PUT") result = await update(body);
  else if (method === "DELETE") result = await deleteTransaction(body.id);
  const [status, message] = result;
  res.status(status).json(message);
}
