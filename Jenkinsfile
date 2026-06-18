pipeline {
    agent any

    parameters {
        choice(name: 'ENV', choices: ['prod', 'staging'], description: 'Target environment config file')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser used by Playwright')
        booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run browser in headless mode')
        string(name: 'TAGS', defaultValue: '@smoke', description: 'Cucumber tag expression. Example: @smoke, @cart, @smoke or @regression. Leave blank to run all scenarios.')
        string(name: 'USER_ROLE', defaultValue: 'default', description: 'Login role. default uses app-login. Other roles use app-<role>-login, example app-custom1-login.')
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
                script {
                    def selectedRole = params.USER_ROLE?.trim()?.toLowerCase()
                    def credentialId = selectedRole == 'default' ? 'app-login' : "app-${selectedRole}-login"

                    withCredentials([
                        usernamePassword(
                            credentialsId: credentialId,
                            usernameVariable: 'APP_USERNAME',
                            passwordVariable: 'APP_PASSWORD'
                        )
                    ]) {
                        bat '''
                        set ENV=%ENV%
                        set BROWSER=%BROWSER%
                        set HEADLESS=%HEADLESS%
                        set USER_ROLE=%USER_ROLE%
                        if "%TAGS%"=="" (
                            npm run test:ci
                        ) else (
                            npm run test:ci -- --tags "%TAGS%"
                        )
                        '''
                    }
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
