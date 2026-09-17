pipeline {
   agent any

    stages {

        stage("Code") {
            steps {
                git url: "https://github.com/Pradyumna2005-21/Todo.git",
                    branch: "main"
            }
        }

        stage("Build") {
            steps {
                sh "docker build -t todo ."
            }
        }

        stage("Test") {
            steps {
                echo "Test done"
            }
        }

        stage("Push to Docker Hub") {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "dockerhubcreds",
                        usernameVariable: "dockerhubusr",
                        passwordVariable: "dockerpass"
                    )
                ]) {
                    sh "docker login -u ${env.dockerhubusr} -p ${env.dockerpass}"
                    sh "docker tag todo ${env.dockerhubusr}/todo:latest"
                    sh "docker push ${env.dockerhubusr}/todo:latest"
                }
            }
        }

        stage('Deploy') {
    steps {
        sh 'docker compose down'
        sh 'docker compose up -d --pull always'
    }
}
    }
}
