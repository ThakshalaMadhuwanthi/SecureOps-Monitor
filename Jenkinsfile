pipeline{

agent any

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

stage('Dependancy Scan'){
    steps{
        sh 'trivy fs .'
    }
}





}





}