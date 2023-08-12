import prisma from "../config/database";

export async function cleanDb(){
    await prisma.vacation.deleteMany({})
    await prisma.employee.deleteMany({})
}