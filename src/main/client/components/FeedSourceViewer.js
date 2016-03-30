import React from 'react'

import { Grid, Row, Col, Button, Table, Input, Panel, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'

import ManagerPage from '../components/ManagerPage'
import EditableTextField from './EditableTextField'
import FeedVersionNavigator from './FeedVersionNavigator'

import { retrievalMethodString } from '../util/util'

const retrievalMethods = [
  'FETCHED_AUTOMATICALLY',
  'MANUALLY_UPLOADED',
  'PRODUCED_IN_HOUSE'
]

export default class FeedSourceViewer extends React.Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.onComponentMount(this.props)
  }

  render () {
    const fs = this.props.feedSource

    if(!fs) {
      return <ManagerPage />
    }

    return (
      <ManagerPage ref='page'>
        <Grid>
          <Row>
            <Col xs={12}>
              <ul className='breadcrumb'>
                <li><Link to='/'>Projects</Link></li>
                <li><Link to={`/project/${this.props.project.id}`}>{this.props.project.name}</Link></li>
                <li className='active'>{fs.name}</li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <h2>{fs.name}</h2>
            </Col>
          </Row>

          <Panel header={(<h3><Glyphicon glyph='cog' /> Feed Source Properties</h3>)}>
            <Row>
              <Col xs={6}>
                <Table striped>
                  <thead>
                    <tr>
                      <th className='col-md-4'>Property</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>
                        <EditableTextField
                          value={fs.name}
                          onChange={(value) => this.props.feedSourcePropertyChanged(fs, 'name', value)}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>Retrieval Method</td>
                      <td>
                        <Input type='select'
                          value={fs.retrievalMethod}
                          onChange={(evt) => {
                            console.log(evt.target.value);
                            this.props.feedSourcePropertyChanged(fs, 'retrievalMethod', evt.target.value)
                          }}
                        >
                          {retrievalMethods.map(method => {
                            return <option value={method} key={method}>
                              {retrievalMethodString(method)}
                            </option>
                          })}
                        </Input>
                      </td>
                    </tr>

                    {fs.retrievalMethod === 'FETCHED_AUTOMATICALLY'
                      ? <tr>
                          <td>Retrieval URL</td>
                          <td>
                            <EditableTextField
                              value={fs.url}
                              onChange={(value) => this.props.feedSourcePropertyChanged(fs, 'url', value)}
                            />
                          </td>
                        </tr>
                      : null
                    }
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Panel>

          <Panel header={(<h3><Glyphicon glyph='list' /> Feed Versions</h3>)}>
            <FeedVersionNavigator
              versions={fs.feedVersions}
              feedSource={fs}
              updateFeedClicked={() => this.props.updateFeedClicked(fs)}
              uploadFeedClicked={() => {
                console.log('showing modal');
                this.refs.page.showSelectFileModal({
                  title: 'Upload Feed',
                  body: 'Select a GTFS feed to upload:',
                  onConfirm: (files) => {
                    console.log('selected file', files[0]);
                    this.props.uploadFeedClicked(fs, files[0])
                  }
                })
              }}
            />
          </Panel>
        </Grid>
      </ManagerPage>
    )
  }
}