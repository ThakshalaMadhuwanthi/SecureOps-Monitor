pipeline{

agent any

environment{
    IMAGE_NAME = "secureops-monitor"
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

stage('Deploy with Docker Compose'){
    steps{
        sh 'docker compose up -d'
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