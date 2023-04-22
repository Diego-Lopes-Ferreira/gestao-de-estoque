import prisma from '../../prisma/client';

export const config = { api: { bodyParser: true } };

async function create(product) {
  const { name, description, barcode } = product;
  let sqlResult = {};
  try {
    sqlResult = await prisma.product.create({
      data: { name, description, barcode }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not create product" }];
  }
  return [200, { sqlResult }];
}

async function read(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.product.findUnique({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not find product with id: ${id}` }];
  }
  return [200, { sqlResult }];
}

async function reads() {
  let sqlResult = {};
  try {
    sqlResult = await prisma.product.findMany();
  } catch (err) {
    console.warn(err);
    return [500, { message: "Reads products" }];
  }
  return [200, { sqlResult }];
}

async function update(product) {
  const { id, name, description, barcode } = product;
  let sqlResult = {};
  try {
    sqlResult = await prisma.product.update({
      where: { id },
      data: { id, name, description, barcode }
    });
  } catch (err) {
    console.warn(err);
    return [400, { message: "Could not update product" }];
  }
  return [200, { sqlResult }];
}

async function deleteProduct(id) {
  let sqlResult = {};
  try {
    sqlResult = await prisma.product.delete({ where: { id } });
  } catch (err) {
    console.warn(err);
    return [400, { message: `Could not delete product with id: ${id}` }];
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
  else if (method === "DELETE") result = await deleteProduct(body.id);
  const [status, message] = result;
  res.status(status).json(message);
}
