pipeline {
    agent any
    
    environment {
        Docker_User = credentials('	Docker_User')
        sonarScanner = tool name : 'sonar-scanner'
    }
    stages {
        stage('Git Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/sriram-ravi705/quicapp.git']])
            }
        }
        stage('Code Quality') {
            steps {
                script{
                    withSonarQubeEnv('sonar-scanner') {
                       sh '''
                       ${sonarScanner}/bin/sonar-scanner \
                          -Dsonar.projectKey=javascripapp \
                          -Dsonar.sources=.
                       '''
                    }
                }
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t sriramravi477/quiz-app:${BUILD_ID} .'
            }
        }
        stage('Image Quality Scan') {
            steps {
                sh 'trivy image sriramravi477/quiz-app:${BUILD_ID}'
            }
        }
        stage('Docker Push') {
            steps {
                sh '''echo $Docker_User_PSW | docker login -u $Docker_User_USR --password-stdin
                docker push sriramravi477/quiz-app:${BUILD_ID}
                '''
            }
        }
        stage('Updating Kubernetes Deployment Image') {
            steps {
                sh '''pwd
                cd meinfest
                sed -i "s|sriramravi477/quiz-app:.*|sriramravi477/quiz-app:${BUILD_ID}|g" quizapp-deployment.yaml
                '''
            }
        }
        stage('Git Push') {
            steps {
                script{
                    sh '''
                    git config --global user.name "sriram-ravi705"
                    git config --global user.email "sriramravi477@gmail.com"
                    git checkout master
                    git add meinfest/quizapp-deployment.yaml
                    git commit -m "Updated image tag to ${BUILD_ID}"
                    '''
                }
                
                withCredentials([usernamePassword(credentialsId: 'Github_Cred', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
                        sh '''git remote set-url origin https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/sriram-ravi705/quicapp.git
                        git push origin master --force
                        '''
                }
            }
        }
    }
}
