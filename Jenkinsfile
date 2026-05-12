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

stage('Cleanup Old containers'){
    steps{
        sh '''
                    echo "Stopping old containers..."
                    docker compose down --remove-orphans || true

                    echo "Cleaning unused containers..."
                    docker ps -aq | xargs -r docker rm -f || true

                    echo "Cleaning unused images..."
                    docker image prune -af || true
                '''
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