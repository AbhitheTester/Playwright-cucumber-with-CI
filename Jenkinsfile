pipeline {
    agent any

    parameters {
        choice(name: 'ENV', choices: ['prod', 'staging'], description: 'Target environment config file')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser used by Playwright')
        booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run browser in headless mode')
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Test') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'app-login',
                        usernameVariable: 'APP_USERNAME',
                        passwordVariable: 'APP_PASSWORD'
                    )
                ]) {
                    bat '''
                    set ENV=%ENV%
                    set BROWSER=%BROWSER%
                    set HEADLESS=%HEADLESS%
                    npm run test:ci
                    '''
                }
            }
            post {
                always {
                    bat 'npm run report'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**, reports/**', allowEmptyArchive: true
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'test-results/html-report',
                reportFiles: 'index.html',
                reportName: 'Cucumber HTML Report'
            ])
        }
    }
}
