const SubmissionProducer = require('../producers/submissionQueueProducer');

class SubmissionService{
    constructor(submissionRepository){
        this.submissionRepository = submissionRepository;
    }
    async addSubmission(submissionPayload){
        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission){
            throw new Error('not able to create submission');
        }
        console.log(submission);
        const response =  await SubmissionProducer(submission);
        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService;