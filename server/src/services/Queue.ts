import Bee from 'bee-queue';
import NotifyBondReturns from '../jobs/NotifyBondReturns';
import redisConfig from '../config/redis';
import SendConfirmAccountMail from '../jobs/SendConfirmAccountMail';

const jobs = [NotifyBondReturns, SendConfirmAccountMail];

class Queue {
  public queues: any;

  constructor() {
    this.queues = {};

    this.init();
  }

  // Init jobs from queue with Redis
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Add new job to queue
  add(queue: any, job: any) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Process jobs from queue
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job: any, err: Error) {
    console.log(`Queue ${job.queue.name}: FAILED -`, err);
  }
}

export default new Queue();
