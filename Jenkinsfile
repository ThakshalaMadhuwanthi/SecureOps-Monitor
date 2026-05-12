pipeline{

agent any

environment{
    IMAGE_NAME = "secureops-monitor"
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
        sh 'trivy fs . || true'
    }
}

stage('Push Images to docker Hub'){
    steps{
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable:'USER', passwordVariable:'PASS')]){
            sh '''
             docker login -u $USER -p $PASS

             docker tag secureops-frontend $USER/secureops-frontend:latest

             docker tag secureops-backend $USER/secureops-backend:latest

             docker push  $USER/secureops-frontend:latest

             docker push $USER/secureops-backend:latest

             '''
        }
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