import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//post
export async function addTodos(title: string) {
    return prisma.todo.create({
        data: {title},
    });
}

//get
export async function getTodos(){
    return prisma.todo.findMany();
}

//update
export async function toggleTodoDone(id: string){
    const todo = await prisma.todo.findUnique({
        where: {id}
    });
    if(!todo) throw new Error("todo not found");
    return prisma.todo.update({
        where:{id},
        data:{done:!todo.done}
    })
}

//delete
export async function deleteTodo(id: string){
    return prisma.todo.delete({
        where:{id}
    })
}