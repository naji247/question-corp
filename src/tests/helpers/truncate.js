import _ from 'lodash';
import models from '../../data/models'

export default async function truncate() {
  return await Promise.all([
    models.Vote.destroy({where:{}, force: true}),
    models.User.destroy({where:{}, force: true}),
    models.Post.destroy({where:{}, force: true}),
    models.EmailDomain.destroy({where:{}, force: true}),
    models.Company.destroy({where:{}, force: true}),
    models.User.destroy({where:{}, force: true}),
  ]);
}
