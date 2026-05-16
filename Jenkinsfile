pipeline{

agent any

environment{
    AWS_REGION = 'eu-north-1'
    AWS_ACCOUNT_ID = '442415869766'

    FRONTEND_IMAGE = 'secureops-frontend'
    BACKEND_IMAGE = 'secureops-backend'


  FRONTEND_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/secureops-frontend"
  BACKEND_REPO= "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/secureops-backend"

}

triggers{
    githubPush()
}

stages{

stage('CloneRepo'){

    steps{
     
    git branch: 'main',
    credentialsId: 'git',
    url: 'git@github.com:ThakshalaMadhuwanthi/SecureOps-Monitor.git'
    }


}

stage('Screct Scan'){
    steps{
        sh 'gitleaks detect --exit-code 1'
    }
}



stage('Build Docker Images'){
    steps{
        sh 'docker compose build'
    }
}

stage('Container security Scan'){
    steps{
        sh 'trivy fs .'
    }
}

stage('Login to AWS ECR'){
    steps{
        withCredentials([
        [

            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'aws-creds'
        ]

        ]){

       sh '''
        aws ecr get-login-password  --region $AWS_REGION | \
        docker login --username AWS --password-stdin \
        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com


       ''' // generate tempory token and send it to docker in ECR with pipe always use username AWS


        }


    }
}

stage('Tag Docker Images'){

steps{
    sh '''
     docker tag $FRONTEND_IMAGE:latest $FRONTEND_REPO:latest
     docker tag $BACKEND_IMAGE:latest  $BACKEND_REPO:latest

    '''
}



}

stage('Push Images to ECR'){

    steps{
        sh '''

        docker push $FRONTEND_REPO:latest
        docker push $BACKEND_REPO:latest

        '''
    }
}



}

post{
    success{
        echo "Pipeline successful"
    }

    failure{
        echo "Pipeline failed"
    }
}



}