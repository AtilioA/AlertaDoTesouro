import Bee from 'bee-queue';
import NotifyBondReturns from '../jobs/NotifyBondReturns';
import redisConfig from '../config/redis';
import SendConfirmAccountMail from '../jobs/SendConfirmAccountMail';
import SendResetPasswordMail from '../jobs/SendResetPasswordMail';
import SendDataExportMail from '../jobs/SendDataExportMail';

const jobs = [
  NotifyBondReturns,
  SendConfirmAccountMail,
  SendResetPasswordMail,
  SendDataExportMail,
];

/**
 * @class Queue
 * @description Class for managing the queue.
 */
class Queue {
  public queues: any;

  constructor() {
    this.queues = {};

    this.init();
  }

  /**
   * Init jobs from queue with Redis
   */
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

  /**
   * Add a job to the queue
   *
   * @param queue - Queue to add job
   * @param job - Job to be added
   * @returns Queue with job added
   */
  add(queue: any, job: any) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * Process jobs from queue
   */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  /**
   * Handle failure of a job.
   *
   * @param job - Job that failed
   * @param err - Error that occurred
   */
  handleFailure(job: any, err: Error) {
    console.log(`Queue ${job.queue.name}: FAILED -`, err);
  }
}

export default new Queue();
