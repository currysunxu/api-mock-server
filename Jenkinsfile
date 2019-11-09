#!groovy
library identifier: 'jenkinssharedlib@tencentcloud', retriever: modernSCM(
  [$class       : 'GitSCMSource',
   remote       : 'ssh://git@bitbucket.eflabs.cn:7999/elab/jenkinssharedlib.git',
   credentialsId: '6eb8497e-6687-41e7-8a3c-1856eb98116e'])

config = [
  service           : 'omni-gateway-mock',                   // docker-compose service for building image.
  imageRepo         : 'test4kids/omni-gateway-mock',
  teamsConnectorName: 'QA-Notification',
  teamsConnectorUrl : 'https://outlook.office.com/webhook/a7f32c1d-faf5-4e70-9b87-c1553ce93d97@f0d1c6fd-dff0-486a-8e91-cfefefc7d98d/JenkinsCI/01e4043cc1d647e781964c31f1bc39bb/6034223b-343c-4dc8-8cd6-f71f41659b6c'
]

pipeline {
  options {
    disableConcurrentBuilds()
    timeout(time: 15, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
    office365ConnectorWebhooks([
      [
        name: config.teamsConnectorName, url: config.teamsConnectorUrl,
        notifySuccess: true, notifyFailure: true, notifyRepeatedFailure: true, notifyUnstable: true, notifyBackToNormal: true
      ]
    ])
  }
  triggers {
    pollSCM('H/5 * * * *')
  }
  agent {
    kubernetes {
      label 'npm-slave'
      defaultContainer 'jnlp'
      yaml ktNpmPodTemplate()
    }
  }
  stages {
    stage('Prepare') {
      steps {
        container('npm') {
          script {
            def branch = ktGetTriggerBranch()
            def commitHash = ktGetCommitHash()
            IMAGE_TAG = ktGetBranchWithHashTag(branch, commitHash)
          }
        }
      }
    }
    stage('Restore') {
      steps {
        container('npm') {
          sh """
          npm install --production --registry=https://registry.npm.taobao.org
          npm prune
          """
        }
      }
    }
    stage('Build & Push Image') {
      steps {
        script {
          container('docker') {
            ktBuildAndPushImage(config.service, config.imageRepo, IMAGE_TAG)
          }
        }
      }
    }
  }
}
