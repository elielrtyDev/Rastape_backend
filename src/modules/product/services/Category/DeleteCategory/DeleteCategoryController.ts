import DeleteCategoryService from '@modules/product/services/Category/DeleteCategory/DeleteCategoryService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const service = container.resolve(DeleteCategoryService);

    await service.execute({ id, user_id });

    return response.status(204).send();
  }
}

export default DeleteCategoryController;
